// Presentational component: Displays simple links to index and create route on
// all pages.

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Login from './Login';
import Logout from './Logout';
import { loginUser, logoutUser } from '../store/actions/authActions';
import PropTypes from 'prop-types';

class NavigationBar extends React.Component {
	state = {
		activeItem: 'index',
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { isAuthenticated, errorMessage } = this.props;
		const { activeItem } = this.state;

		return (
			<Menu secondary>
				<Menu.Item name="index" active={activeItem === 'index'} onClick={this.handleItemClick}>
					<Link to={'/'}>Return to Index </Link> <br />
				</Menu.Item>
				<Menu.Item name="new" active={activeItem === 'new'} onClick={this.handleItemClick}>
					<Link to={'/notes/new'}>Create a new note!</Link>
					<br />
				</Menu.Item>
				<Menu.Item name="new" active={activeItem === 'new'} onClick={this.handleItemClick}>
					<Link to={'/notes/trash'}>Click for the Trash Can</Link>
				</Menu.Item>
				{!isAuthenticated && (
					<Menu.Item>
						<Login errorMessage={errorMessage} onLoginClick={creds => loginUser(creds)} />
					</Menu.Item>
				)}

				{isAuthenticated && (
					<Menu.Item>
						{' '}
						<Logout onLogoutClick={() => logoutUser()} />{' '}
					</Menu.Item>
				)}
				<br />
			</Menu>
		);
	}
}

NavigationBar.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
};

export default NavigationBar;
