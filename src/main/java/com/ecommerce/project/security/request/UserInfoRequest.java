package com.ecommerce.project.security.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserInfoRequest {

    private String username;
    private String password;

}
