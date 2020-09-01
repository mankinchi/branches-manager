/* global $, auth */
/* global getData, getRef, populateIssuesForElement */

getData('/users/tri', ({ info, ...servers }) => {
	const $servers = $('.servers-selector');
	$servers.empty();
	for (const server of Object.keys(servers)) {
		$servers.append(
			$('<option>', {
				text: server,
				value: server,
			}),
		);
	}

	populateIssuesForElement(
		$('.issues-selector'),
		(issueId, {
			name,
			branch,
		}) => (
			$('<option>', {
				text: name,
				'data-branch': branch,
				'data-issueid': issueId,
			})
		),
		info,
	);
});

$('#add-issue').click(() => {
	const server = $('#server-new-issue').val();
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

$('#add-server').click(() => {
	const serverName = $('#server-name').val();
	getRef('/users/tri').update({
		[serverName]: {
			issue: '',
		},
	});

	$('#server-name').val('');
});

$('#set-issue-for-server').click(() => {
	const server = $('#server-set-issue').val();
	const issue = $('#issue-for-server').find('option:selected').data('issueid');

	getRef(`/users/tri/${server}`).set({
		issue,
	});
});

auth.onAuthStateChanged((user) => {
	if (!user) {
		window.location.href = '/login';
	}
});
