/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

// router service
import settingservice from "../../router_service/settingservice";

import Header from './header';
import SettingsSidebar from './settingsidebar';

const SettingsLayout = (props) => {
		const { match } = props;
		return (
			<>
				<Header/>
				<div>
					{settingservice && settingservice.map((route,key)=>
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					)}
				</div>				
				<SettingsSidebar/>
			</>
		);
	
}
export default withRouter(SettingsLayout);