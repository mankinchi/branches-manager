/* global $, emailjs */
/* global getData, getDataOnce, populateIssuesForElement */
const EMAIL_SERVICE = 'gmail';
const EMAIL_TEMPLATE = 'request';

emailjs.init('user_EETEdffhneDTGxLFPJlUX');

const usersInfo = {};
const $tableBody = $('#table-body');

const getTableRow = (username, serverName, serverInfo) => (
	$('<tr>', {
		'data-username': username,
		'data-server': serverName,
		'data-issue': serverInfo.issue,
	}).append(
		$('<td>').text(usersInfo[username].name),
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
					class: 'btn request-change-btn',
					text: 'Request change',
				}),
			),
		),
	)
);

getDataOnce('/users', (data) => {
	for (const [key, { info, ...servers }] of Object.entries(data)) {
		usersInfo[key] = info;
		for (const [serverName, serverInfo] of Object.entries(servers)) {
			const $tableRow = getTableRow(key, serverName, serverInfo);
			$tableBody.append($tableRow);

			(($row) => {
				getData(`/users/${key}/${serverName}`, (server) => {
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

	const username = $row.data('username');
	const userInfo = usersInfo[username];

	emailjs.send(
		EMAIL_SERVICE,
		EMAIL_TEMPLATE,
		{
			email: userInfo.email,
			user_name: 'Nigel',
			server_name: $row.data('server'),
			branch_name: $option.data('branch'),
			issue_name: $option.text(),
			issue_link: $option.data('link'),
		},
	);
});
