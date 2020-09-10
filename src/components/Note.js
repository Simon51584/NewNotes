//Presentational component = renders title and content of passed in Note with link to
//edit route for introspected upon note.

import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const Note = ({ note }) => {
	return (
		<Segment inverted>
			<Header as="h4">Current Note Title: {note.title}</Header>

			<p>{note.content}</p>
			<br />
			<br />
			<br />
		</Segment>
	);
};

export default Note;
