package com.nhom678.server.repositories;

import com.nhom678.server.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
    Optional<Publisher> findPublisherByPublisherId(Integer publisherId);
    Boolean existsPublisherByPublisherName(String publisherName);
    void deletePublishersByPublisherId(Integer publisherId);
}
