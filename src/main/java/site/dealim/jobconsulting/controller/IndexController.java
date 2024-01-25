package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import site.dealim.jobconsulting.service.MemberServiceImpl;

@Slf4j
@Controller
public class IndexController {

    @Autowired
    private MemberServiceImpl memberServiceImpl;

    @GetMapping("/")
    public String index() {
        return "index.html";
    }
}
