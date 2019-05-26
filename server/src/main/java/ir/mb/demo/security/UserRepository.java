package ir.mb.demo.security;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {
    UserEntity findByUsername(String username);
    UserEntity findByUsernameAndPassword(String userName, String password);
}
