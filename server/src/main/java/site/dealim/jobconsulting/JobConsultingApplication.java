package site.dealim.jobconsulting;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class JobConsultingApplication {

    public static void main(String[] args) {
        String currentDir = System.getProperty("user.dir");
        Path rootPath = Paths.get(currentDir);
        String envPath = rootPath.resolve(".env").normalize().toAbsolutePath().toString();

        Dotenv dotenv = Dotenv.configure()
                .directory(envPath)
                .load();

        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });

        SpringApplication.run(JobConsultingApplication.class, args);
    }
}
