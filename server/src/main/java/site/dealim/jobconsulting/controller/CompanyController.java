package site.dealim.jobconsulting.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.service.CompanyService;

@RestController
public class CompanyController {
    private CompanyService companyService;
    @PostMapping("/com-cl-save")
    public String comCoverLetterSave() {
        return companyService.comCoverLetterSave();
    }
}