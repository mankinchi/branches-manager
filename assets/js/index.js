/* global $, emailjs, auth */

/* global getData, getDataOnce, populateIssuesForElement */
const EMAIL_SERVICE = 'gmail';
const EMAIL_TEMPLATE = 'request';

emailjs.init('user_EETEdffhneDTGxLFPJlUX');

const usersInfo = {};
const $tableBody = $('#table-body');
let user;

const getTableRow = (userInfo, serverName, serverInfo) => (
	$('<tr>').data({
		userInfo,
		server: serverName,
		issue: serverInfo.issue,
	}).append(
		$('<td>').text(userInfo.name),
		$('<td>').text(serverName),
		$('<td>').append(
			$('<a>', {
				target: '_blank',
				href: '#',
			}),
		),
		$('<td>').append(
			$('<div>', {
				class: 'form-inline',
			}).append(
				$('<select>', {
					class: 'form-control',
				}),
				$('<button>', {
					class: 'btn btn-primary request-change-btn',
					text: 'Request change',
				}),
			),
		),
	)
);

getDataOnce('/users', (data) => {
	for (const [userId, { info, ...servers }] of Object.entries(data)) {
		usersInfo[userId] = info;
		for (const [serverName, serverInfo] of Object.entries(servers)) {
			const $tableRow = getTableRow(info, serverName, serverInfo);
			$tableBody.append($tableRow);

			(($row) => {
				getData(`/users/${userId}/${serverName}`, (server) => {
					const completeFnc = (currentIssueId) => {
						populateIssuesForElement(
							$row.find('select'),
							(issueId, {
								name,
								branch,
							}) => {
								if (issueId !== currentIssueId) {
									return $('<option>', {
										text: name,
										'data-branch': branch,
									});
								}
								return null;
							},
							info,
						);
					};

					if (server.issue !== '') {
						getDataOnce(`/issues/${server.issue}`, (issueData) => {
							const $link = $row.find('a');
							$link
								.attr('href', issueData.link)
								.text(issueData.name);

							$row.data('issue', issueData);

							completeFnc(server.issue);
						});
					} else {
						const $link = $row.find('a');
						$link.text('');

						completeFnc();
					}
				});
			})($tableRow);
		}
	}
});

$tableBody.on('click', '.request-change-btn', (e) => {
	const $row = $(e.currentTarget).parents('tr');

	const $option = $row.find('option:selected');

	const info = $row.data('userInfo');
	const currentUserInfo = usersInfo[user.uid];

	emailjs.send(
		EMAIL_SERVICE,
		EMAIL_TEMPLATE,
		{
			email: info.email,
			user_name: currentUserInfo.name,
			server_name: $row.data('server'),
			branch_name: $option.data('branch'),
			issue_name: $option.text(),
			issue_link: $option.data('link'),
		},
	);
});

$('#logout').click(() => {
	auth.signOut();
});

auth.onAuthStateChanged((currentUser) => {
	if (!currentUser) {
		window.location.href = '/login';
	} else {
		user = currentUser;
	}
});
