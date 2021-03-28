package com.apptemplate.application;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.vaadin.artur.helpers.LaunchUtil;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the * and some desktop browsers.
 *
 */
@SpringBootApplication
@Theme(value = "apptemplate", variant = Lumo.DARK)
@PWA(name = "App template", shortName = "App template", offlineResources = {"images/logo.png"})
public class AppTemplateApplication extends SpringBootServletInitializer implements AppShellConfigurator {

    public static void main(String[] args) {
        LaunchUtil.launchBrowserInDevelopmentMode(SpringApplication.run(AppTemplateApplication.class, args));
    }

}
