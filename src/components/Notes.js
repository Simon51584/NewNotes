// Presentational component: Displays a list of notes by iterating over notes
// passed down from NotesIndexContainer with a link to each note's corresponding
// show page.

import React from 'react';
import { Link } from 'react-router-dom';
import Like from './Like';
import { List, Grid, Divider } from 'semantic-ui-react';

const Notes = props => {
	return props.notes.map((note, i) => {
		return (
			<Grid.Row>
				<List.Item key={i}>
					<List.Content floated="left">
						<ul>
							<li>
								<h2>
									<Link to={`/notes/${note.id}`}>{note.title}</Link>
								</h2>
							</li>
							{note.content}
							<br />
							<Like note={note} />
						</ul>
						<Divider />
					</List.Content>
				</List.Item>
			</Grid.Row>
		);
	});
};

export default Notes;
