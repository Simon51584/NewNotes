//Presentational component displayed when errors occur in API calls.

import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorAlert = () => (
	<Message>
		<Message.Header>There has been an error!</Message.Header>
		<p>Something has gone wrong! Please try again.</p>
	</Message>
);

export default ErrorAlert;
