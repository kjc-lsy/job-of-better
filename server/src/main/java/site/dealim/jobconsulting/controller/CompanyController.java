package site.dealim.jobconsulting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.service.CompanyService;

@Controller
@RestController
public class CompanyController {
    CompanyService adminService;
    @PostMapping("comCoverLetterSave")
    public String comCoverLetterSave() {
        return adminService.comCoverLetterSave();
    }
}
