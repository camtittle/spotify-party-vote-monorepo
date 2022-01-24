variable "project" {
    type = string
}

variable "environment" {
    type = string
}

variable "spotify_client_secret" {
    type = string
}

variable "spotify_redirect_uri" {
    type = string
}

variable "cors_allow_origins" {
    type = list(string)
}
