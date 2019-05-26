package ir.mb.demo.base;


import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

//https://www.baeldung.com/rest-api-search-language-spring-data-specifications
public final class MbSpecificationsBuilder {

    private final List<SpecSearchCriteria> params;

    public MbSpecificationsBuilder() {
        params = new ArrayList<>();
    }

    public MbSpecificationsBuilder with(String key, String operation, Object value) {
        params.add(new SpecSearchCriteria(key, SearchOperation.getSimpleOperation(operation), value));
        return this;
    }
    // API

    public final MbSpecificationsBuilder with(final String key, final String operation, final Object value, final String prefix, final String suffix) {
        return with(null, key, operation, value, prefix, suffix);
    }

    public final MbSpecificationsBuilder with(final String orPredicate, final String key, final String operation, final Object value, final String prefix, final String suffix) {
        SearchOperation op = SearchOperation.getSimpleOperation(operation);
        if (op != null) {
            if (op == SearchOperation.EQUALITY) { // the operation may be complex operation
                final boolean startWithAsterisk = prefix != null && prefix.contains(SearchOperation.ZERO_OR_MORE_REGEX);
                final boolean endWithAsterisk = suffix != null && suffix.contains(SearchOperation.ZERO_OR_MORE_REGEX);

                if (startWithAsterisk && endWithAsterisk) {
                    op = SearchOperation.CONTAINS;
                } else if (startWithAsterisk) {
                    op = SearchOperation.ENDS_WITH;
                } else if (endWithAsterisk) {
                    op = SearchOperation.STARTS_WITH;
                }
            }
            params.add(new SpecSearchCriteria(orPredicate, key, op, value));
        }
        return this;
    }

    public Specification build() {
        if (params.size() == 0)
            return null;

        Specification result = new MbSpecification(params.get(0));

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i).isOrPredicate()
                    ? Specification.where(result).or(new MbSpecification(params.get(i)))
                    : Specification.where(result).and(new MbSpecification(params.get(i)));
        }

        return result;
    }

    public final MbSpecificationsBuilder with(MbSpecification spec) {
        params.add(spec.getCriteria());
        return this;
    }

    public final MbSpecificationsBuilder with(SpecSearchCriteria criteria) {
        params.add(criteria);
        return this;
    }


}