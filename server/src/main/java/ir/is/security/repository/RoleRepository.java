package ir.is.security.repository;

import ir.is.security.entity.Role;
import ir.is.security.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long>, JpaSpecificationExecutor<UserEntity> {
    Role findByName(String name);
}
