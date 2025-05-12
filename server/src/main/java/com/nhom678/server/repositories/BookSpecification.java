package com.nhom678.server.repositories;

import com.nhom678.server.dto.request.book.BookSearchCriteria;
import com.nhom678.server.entity.Book;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class BookSpecification {
    public static final Specification<Book> buildSpecification(BookSearchCriteria criteria) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(criteria.getBookName() != null && !criteria.getBookName().isBlank())
                predicates.add(cb.like(cb.lower(root.get("bookName")), "%" + criteria.getBookName().toLowerCase() + "%"));

            if(criteria.getIsbn() != null && !criteria.getIsbn().isBlank())
                predicates.add(cb.equal(root.get("isbn"), criteria.getIsbn()));


            if(criteria.getPublicationDate() != null)
                predicates.add(cb.equal(root.get("publicationDate"), criteria.getPublicationDate()));

            if(criteria.getRating() != null)
                predicates.add(cb.greaterThanOrEqualTo(root.get("rating"), criteria.getRating()));

            if(criteria.getFloorPosition() != null && !criteria.getFloorPosition().isBlank())
                predicates.add(cb.equal(root.get("floorPosition"), criteria.getFloorPosition()));

            if (criteria.getCategoryIds() != null && !criteria.getCategoryIds().isEmpty()) {
                predicates.add(root.get("category").get("categoryId").in(criteria.getCategoryIds()));
            }

            if (criteria.getPublisherIds() != null && !criteria.getPublisherIds().isEmpty()) {
                predicates.add(root.get("publisher").get("publisherId").in(criteria.getPublisherIds()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));

        };
    }
}
