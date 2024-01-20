package site.dealim.jobseeker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping({"/", "/error", "/admin"})
    public String index() {
        return "index.html";
    }
}
