package ru.devobserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import ru.devobserver.services.VideoStreamService;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class DevObserverApplication {

	private final VideoStreamService videoStreamService;

	@Autowired
	public DevObserverApplication(VideoStreamService videoStreamService) {
		this.videoStreamService = videoStreamService;
	}

	public static void main(String[] args) {
		SpringApplication.run(DevObserverApplication.class, args);
	}

	@PostConstruct
	void postConstruct() {
		videoStreamService.start();
	}

	@PreDestroy
	void preDestroy() {
		videoStreamService.stop();
	}

	@Bean
	public TaskExecutor taskExecutor() {
		final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(5);
		executor.setMaxPoolSize(10);
		executor.setQueueCapacity(25);
		return executor;
	}
}
