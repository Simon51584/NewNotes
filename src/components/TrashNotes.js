// Presentational component: Displays a list of notes by iterating over notes
// passed down from NotesIndexContainer.

import React from 'react';
import RestoreNote from './RestoreNote';
import { List } from 'semantic-ui-react';

const TrashNotes = ({ notes, actions }) => {
	return notes.map((note, i) => {
		return (
			<List.Item key={i}>
				<List.Content floated="left">
					<ul>
						<li>
							<h2>{note.title}</h2>
						</li>
						{note.content}
						<br />
						<RestoreNote note={note} actions={actions} />
					</ul>
				</List.Content>
			</List.Item>
		);
	});
};

export default TrashNotes;
