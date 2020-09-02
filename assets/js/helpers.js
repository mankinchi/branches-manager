/* global $ */
/* global getData */
/* eslint no-unused-vars: "off" */

const populateIssuesForElement = ($selector, renderFunction, userInfo) => {
	getData('/issues', (issues) => {
		$selector.empty();

		let numIssues = 0;

		for (const [
			issueId,
			issue,
		] of Object.entries(issues)) {
			if (issue.userId === userInfo.id) {
				numIssues += 1;

				const $option = renderFunction(issueId, issue);
				if ($option) {
					$selector.append($option);
				}
			}
		}

		if (numIssues === 0) {
			const $option = renderFunction(-1, {
				name: 'No Issue',
				branch: 'No Issue',
			});
			if ($option) {
				$selector.append($option);
			}
		}
	});
};
