package group2.backend.repository;


import group2.backend.model.Application;
import group2.backend.model.Account;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ApplicationRepository extends CrudRepository <Application, Long> {
    List<Application> findByUser(Account user);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM Application a WHERE a.user.id = ?1")
    void deleteByUserId(Long userId);
}
