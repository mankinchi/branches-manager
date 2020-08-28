/* global $ */
/* global getDataOnce, getRef */

getDataOnce('/users/tri', ({ info: _info, ...servers }) => {
	const $servers = $('#servers');
	for (const server of Object.keys(servers)) {
		$servers.append(
			$('<option>', {
				text: server,
				value: server,
			}),
		);
	}
});

$('#add-issue').click(() => {
	const server = $('#servers').val();
	const issueName = $('#issue-name').val();
	const issueLink = $('#issue-link').val();
	const issueBranch = $('#issue-branch').val();
	const setToCurrentBranch = $('#set-current-branch').prop('checked');

	const newIssueKey = getRef().child('issues').push().key;

	const updates = {};
	updates[`/issues/${newIssueKey}`] = {
		branch: issueBranch,
		link: issueLink,
		name: issueName,
		userId: 1,
	};

	if (setToCurrentBranch) {
		updates[`/users/tri/${server}/issue`] = newIssueKey;
	}

	getRef().update(updates);

	$('#issue-name, #issue-link, #issue-branch').val('');
	$('#set-current-branch').prop('checked', false);
});
