package site.dealim.jobconsulting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import site.dealim.jobconsulting.config.EnvInitializer;

@SpringBootApplication
public class JobConsultingApplication {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(JobConsultingApplication.class);
        application.addInitializers(new EnvInitializer());
        application.run(args);
    }
}
