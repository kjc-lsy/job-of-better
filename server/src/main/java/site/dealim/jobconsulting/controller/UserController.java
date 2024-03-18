package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/user-cover-letter-save")
    public ResponseEntity<?> userCoverLetterSave(@AuthenticationPrincipal CustomMember customMember, @RequestBody List<ComCoverLetter> values) {
        //userService.userCoverLetterSave(values, customMember.getMember().getMemIdx());
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("user-cover-letter-info")
    public List<ComCoverLetter> userCoverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("자소서 항목 불러오기");
        Member user = customMember.getMember();
        return userService.userCoverLetterInfo(user.getComIdx());
    }
}
