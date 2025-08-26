package com.ecommerce.project.security.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserInfoResponse {

    private String jwtToken;
    private String username;
    private List<String> roles;
    private String id;
    private String email;

    public UserInfoResponse(String id, String username, List<String> roles, String email, String jwtToken) {
        this.username = username;
        this.roles = roles;
        this.id = id;
        this.email = email;
        this.jwtToken = jwtToken;
    }


    public UserInfoResponse(String id, String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
        this.id = id;
    }
}
