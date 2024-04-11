package site.dealim.jobconsulting.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import site.dealim.jobconsulting.service.ComProgramService;

@Component
@EnableScheduling
public class ProgramStatusScheduler {
    @Autowired
    private ComProgramService comProgramService;


    // 매일 자정에 실행되는 스케줄된 작업
    @Scheduled(cron = "0 * * * * ?")
    public void updateProgramColumn() {
        try {
            comProgramService.updateAllProgramsStatus();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
