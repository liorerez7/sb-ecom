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

    public UserInfoResponse(String id, String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
        this.id = id;
    }


}
