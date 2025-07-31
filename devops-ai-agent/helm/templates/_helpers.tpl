{{/* Generate fully qualified app name */}}
{{- define "devops-ai-agent.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name -}}
{{- end -}}

{{/* Chart name */}}
{{- define "devops-ai-agent.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{/* Common labels */}}
{{- define "devops-ai-agent.labels" -}}
app.kubernetes.io/name: {{ include "devops-ai-agent.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}