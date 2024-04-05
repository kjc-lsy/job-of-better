package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.MemCoverLetterService;
import site.dealim.jobconsulting.service.MyInfoService;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class MyInfoController {
    @Autowired
    MyInfoService myinfoService;

    @GetMapping("/user-profile-info")
    public Member userProfileInfo(@AuthenticationPrincipal CustomMember customMember) {
        Member user = customMember.getMember();
        return myinfoService.userProfileInfo(user.getIdx());
    }
}
