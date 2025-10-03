package gm.inventarios.services;

import gm.inventarios.entity.User;

public interface UserService {
    User login(String username, String password);
}
