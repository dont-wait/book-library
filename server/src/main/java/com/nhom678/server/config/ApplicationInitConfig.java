package com.nhom678.server.config;

import com.nhom678.server.entity.Admin;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.UserRole;
import com.nhom678.server.repositories.AdminRepository;
import com.nhom678.server.repositories.UserAccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Slf4j
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE) //CREATE DEFAULT ADMIN
public class ApplicationInitConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner appRunner(AdminRepository adminRepository, UserAccountRepository userAccountRepository) {
        return args -> {
           if( adminRepository.findByAdminId("admin00001").isEmpty()) {
                var roles = new HashSet<String>();
                roles.add(UserRole.ADMIN.name());

               Admin admin = Admin.builder()
                       .adminId("admin00001")
                       .firstName("Administrator")
                       .lastName("HERO")
                       .build();
               adminRepository.save(admin);
               UserAccount defaultAdminAccount = UserAccount.builder()
                       .userId(admin.getAdminId())
                       .admin(admin)
                       .roles(roles)
                       .isActived(true)
                       .password(passwordEncoder.encode("admin123@"))
                       .build();
               userAccountRepository.save(defaultAdminAccount);
               log.warn("Default admin account created");
            }
        };
    }
}
