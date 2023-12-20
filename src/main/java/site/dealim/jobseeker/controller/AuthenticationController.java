package site.dealim.jobseeker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import site.dealim.jobseeker.model.User;
import site.dealim.jobseeker.service.CustomUserDetailsService;

@Controller
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register";
    }

    @PostMapping("/register")
    public String processRegistrationForm(@ModelAttribute User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        customUserDetailsService.save(user);
        return "login";
    }
}
