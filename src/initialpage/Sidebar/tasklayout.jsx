/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

// router service
import taskservice from "../../router_service/taskservice";

import Header from './header';
import SidebarContent from './tasksidebar';

const Tasklayout = (props) => {
		const { match } = props;
		return (
			<>
				<Header/>
				{/* <div> */}
					{taskservice && taskservice.map((route,key)=>
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					)}
				{/* </div>				 */}
				<SidebarContent/>
			</>
		);
	
}
export default withRouter(Tasklayout);