package site.dealim.jobseeker.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import site.dealim.jobseeker.model.User;
import site.dealim.jobseeker.repository.UserRepository;
import site.dealim.jobseeker.security.UserDetailsImpl;
import site.dealim.jobseeker.service.CustomUserDetailsService;

@Service
public class CustomUserDetailServiceImpl implements CustomUserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new UserDetailsImpl(user);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }
}
