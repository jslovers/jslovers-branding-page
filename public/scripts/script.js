const { Octokit } = require("@octokit/rest");
const fs = require("fs").promises;
const path = require("path");

// Use environment variable for GitHub token
const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

const contributorsFilePath = path.join(
	__dirname,
	"contributors.md"
);

async function updateContributorsFile(
	username,
	contributions
) {
	try {
		// Read current contributors from the file
		let currentContributors = [];
		try {
			const content = await fs.readFile(
				contributorsFilePath,
				"utf-8"
			);
			currentContributors = JSON.parse(content);
		} catch (error) {
			console.error(
				"Error reading contributors file:",
				error.message
			);
		}

		// Add new contributor
		const newContributor = { username, contributions };
		currentContributors.push(newContributor);

		// Write updated contributors to the file
		await fs.writeFile(
			contributorsFilePath,
			JSON.stringify(currentContributors, null, 2)
		);

		console.log(
			`Contributor ${username} added to ${contributorsFilePath}`
		);
	} catch (error) {
		console.error(
			"Error updating contributors file:",
			error.message
		);
	}
}

async function main() {
	try {
		// Use environment variables for owner and repo
		const owner = process.env.REPO_OWNER;
		const repo = process.env.REPO_NAME;

		// Fetch pull requests for the repository
		const { data: pullRequests } = await octokit.pulls.list(
			{
				owner,
				repo,
				state: "closed",
				base: "main",
			}
		);

		// Process each closed pull request
		for (const pullRequest of pullRequests) {
			const contributorUsername = pullRequest.user.login;
			const contributions =
				pullRequest.additions + pullRequest.deletions;

			// Check if the pull request was merged
			if (pullRequest.merged_at) {
				await updateContributorsFile(
					contributorUsername,
					contributions
				);
			}
		}
	} catch (error) {
		console.error(
			"Error fetching pull requests:",
			error.message
		);
	}
}

main();
