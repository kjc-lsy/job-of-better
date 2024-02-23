package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import site.dealim.jobconsulting.prop.JwtProps;

@Slf4j
@Controller
public class IndexController {
    @Autowired
    private JwtProps jwtProps;

    @GetMapping("/")
    public String index() {
        log.info(jwtProps.getSecretKey());
        return "index.html";
    }
}
