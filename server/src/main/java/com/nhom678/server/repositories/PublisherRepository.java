package com.nhom678.server.repositories;

import com.nhom678.server.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
    Optional<Publisher> findPublisherByPublisherName(String publisherName);
    Boolean existsPublisherByPublisherId(int publisherId);
    Boolean existsPublisherByPublisherName(String publisherName);
    void deletePublisherByPublisherId(int publisherId);
}
