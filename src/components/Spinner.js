import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const Spinner = () => (
	<Segment>
		<Dimmer active inverted>
			<Loader active inline="centered" size="massive" inverted>
				Loading
			</Loader>
		</Dimmer>
	</Segment>
);

export default Spinner;
