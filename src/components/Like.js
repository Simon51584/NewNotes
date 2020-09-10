import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actions/noteActions.js';
import { connect } from 'react-redux';
import { Button, Rating } from 'semantic-ui-react';

class Like extends React.Component {
	componentDidMount() {
		this.setState({ isLiked: this.props.note.liked });
	}

	likeHandler = () => {
		const id = this.props.note.id;
		const isLiked = this.props.note.liked;
		this.props.actions.like(id, isLiked);
	};

	render() {
		return (
			<div>
				<br />
				<Button value="isLiked" onClick={this.likeHandler}>
					Like/Unlike
				</Button>
				{this.props.note.liked ? <Rating icon="heart" rating={1} /> : <Rating icon="heart" rating={0} />}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default connect(null, mapDispatchToProps)(Like);
