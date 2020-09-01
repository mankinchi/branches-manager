/* global $, auth */
/* global getRef */

const getLoginCredential = () => ({
	email: $('#email').val(),
	password: $('#password').val(),
	name: $('#name').val(),
});

const showErrorMessage = (errorMessage) => {
	$('#alert-error').text(errorMessage).fadeIn('fast');
};

const showSuccessMessage = () => {
	$('#alert-success').fadeIn('fast');
};

const hideErrorMessage = () => {
	$('.alert').fadeOut('fast');
};

$('.btn').click(async (e) => {
	hideErrorMessage();
	const $button = $(e.currentTarget);

	const credential = getLoginCredential();
	if (!credential.email && !credential.password && !credential.email) {
		showErrorMessage('Please fill all data in the form');
		return;
	}

	try {
		if ($button.attr('id') === 'sign-up') {
			const { user } = await auth.createUserWithEmailAndPassword(
				credential.email,
				credential.password,
			);

			await getRef('/users').update({
				[user.uid]: {
					info: {
						email: credential.email,
						name: credential.name,
					},
				},
			});

			showSuccessMessage();
		} else {
			await auth.signInWithEmailAndPassword(
				credential.email,
				credential.password,
			);

			showSuccessMessage();
		}
	} catch (error) {
		showErrorMessage(error.message);
	}
});

auth.onAuthStateChanged((user) => {
	if (user) {
		window.location.href = '/';
	}
});
