/* global $ */
/* global getData */
/* eslint no-unused-vars: "off" */

const populateIssuesForElement = ($selector, renderFunction, userInfo) => {
	getData('/issues', (issues) => {
		$selector.empty();

		for (const [
			issueId,
			issue,
		] of Object.entries(issues)) {
			if (issue.userId === userInfo.id) {
				const $option = renderFunction(issueId, issue);
				if ($option) {
					$selector.append($option);
				}
			}
		}
	});
};
