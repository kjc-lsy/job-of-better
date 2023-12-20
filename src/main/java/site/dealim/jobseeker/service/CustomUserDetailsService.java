package site.dealim.jobseeker.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import site.dealim.jobseeker.model.User;

public interface CustomUserDetailsService extends UserDetailsService {
    public User save(User user);
}
