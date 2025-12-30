enum ServiceType {
    SumInUa = "sum_in_ua",
    SumJhekasoft = "sum_jhekasoft",
}

interface Config {
    type?: ServiceType,
    baseUrl?: string
}

export {ServiceType, Config}
