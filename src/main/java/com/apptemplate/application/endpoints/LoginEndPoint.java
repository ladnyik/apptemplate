package com.apptemplate.application.endpoints;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class LoginEndPoint {

	@AnonymousAllowed
	public boolean userLogin(String userId, String password) {

		if (userId.equals("admin"))
			return true;
		else
			return false;

	}
}