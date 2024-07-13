package site.dealim.jobconsulting.config;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

@Slf4j
public class EnvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        log.info("환경 변수를 초기화 중...");
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        MutablePropertySources propertySources = environment.getPropertySources();
        Properties envProps = new Properties();
        Dotenv dotenv = null;

        try {
            dotenv = setDotEnv(envProps); // Dot env 설정
        } catch (RuntimeException e) {
            log.error("Dotenv 설정 중 오류 발생", e);
        }

        if(dotenv != null) {
            try {
                setVertexAiServiceKey(envProps, dotenv.get("VERTEX_AI_SERVICE_KEY_FILENAME")); // Vertex AI service key 설정
            } catch (RuntimeException e) {
                log.error("Vertex AI 서비스 키 설정 중 오류 발생", e);
            }
        }

        propertySources.addFirst(new PropertiesPropertySource("dotenvProperties", envProps));
    }

    public Dotenv setDotEnv(Properties envProps) {
        Dotenv dotenv;
        try {
            // 클래스 패스에서 .env 파일 로드 시도
            ClassPathResource resource = new ClassPathResource(".env");
            if (resource.exists()) {
                log.info(".env 파일을 클래스패스에서 로드합니다...");
                dotenv = Dotenv.configure()
                        .directory(resource.getFile().getAbsolutePath())
                        .filename(".env")
                        .load();
            } else {
                log.info(".env 파일이 클래스패스에 없습니다. " + System.getProperty("user.dir") + "에서 로드를 시도합니다...");
                Path path = Paths.get(System.getProperty("user.dir"), ".env");
                dotenv = Dotenv.configure()
                        .directory(path.toString())
                        .filename(".env")
                        .load();
            }
            // Dotenv에서 로드된 데이터를 Properties 객체에 저장
            dotenv.entries().forEach(e -> envProps.setProperty(e.getKey(), e.getValue()));
            log.info(".env 로드 성공!");
        } catch (Exception e) {
            log.error(".env 파일 로드 실패했습니다. 앱 실행을 위해서 .env 파일을 만들어주세요");
            throw new RuntimeException(".env 파일 로드 실패", e);
        }
        return dotenv;
    }

    public void setVertexAiServiceKey(Properties envProps, String filename) {
        log.info("vertex ai service key를 초기화 중...");

        try {
            ClassPathResource resource = new ClassPathResource(filename);
            if (resource.exists()) {
                try (InputStream inputStream = resource.getInputStream()) {
                    envProps.load(inputStream);
                    log.info(filename + " 파일을 클래스 패스에서 성공적으로 로드했습니다.");
                }
            } else {
                log.info(filename + " 파일이 클래스패스에 없습니다. user.dir에서 로드를 시도합니다...");
                Path path = Paths.get(System.getProperty("user.dir"), filename);
                try (InputStream inputStream = new FileInputStream(path.toString())) {
                    envProps.load(inputStream);
                    log.info(filename + " 파일을 user.dir에서 성공적으로 로드했습니다.");
                }
            }
        } catch (IOException e) {
            log.warn(filename + "를 읽지 못해 해당 서비스는 사용할 수 없습니다.");
            throw new RuntimeException(filename + " 파일 로드 실패", e);
        }
    }
}
