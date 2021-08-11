package ru.devobserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.devobserver.services.VideoStreamService;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@SpringBootApplication
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
}
