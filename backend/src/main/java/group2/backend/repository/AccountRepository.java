package group2.backend.repository;


import group2.backend.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends CrudRepository <Account, Long> {
    Optional<Account> findByEmail(String email);
}
