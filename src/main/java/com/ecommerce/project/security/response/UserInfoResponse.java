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
    private Long id;

    public UserInfoResponse(Long id, String jwtToken, String username, List<String> roles) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.roles = roles;
        this.id = id;
    }
    public UserInfoResponse(Long id, String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
        this.id = id;
    }


}
