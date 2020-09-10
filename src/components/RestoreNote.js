import React from 'react';
import { Button } from 'semantic-ui-react';

const RestoreNote = ({ note, actions }) => {
	const restore = () => {
		const id = note.id;
		actions.restoreNote(id);
	};

	const wipe = () => {
		const id = note.id;
		actions.hardWipeNote(id);
	};

	return (
		<div>
			<Button type="button" onClick={restore}>
				{' '}
				Restore Note{' '}
			</Button>
			<Button type="button" onClick={wipe}>
				{' '}
				Delete Note Forever
			</Button>
		</div>
	);
};

export default RestoreNote;
